/*
  # Create Tracking Updates Table

  1. New Tables
    - `tracking_updates` - Shipment status history and timeline
      - `id` (uuid, primary key)
      - `shipment_id` (uuid, references shipments)
      - `status` (enum: 'pending', 'in_transit', 'delivered', 'cancelled')
      - `location` (text)
      - `latitude` (numeric, optional for GPS tracking)
      - `longitude` (numeric, optional for GPS tracking)
      - `description` (text)
      - `timestamp` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `tracking_updates` table
    - Add policy for customers to view updates for their shipments
    - Add policy for admins to view all updates
    - Add policy for admins to create/update tracking records
*/

CREATE TABLE IF NOT EXISTS tracking_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'in_transit', 'delivered', 'cancelled')),
  location text NOT NULL,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  description text DEFAULT '',
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracking_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view tracking updates for their shipments"
  ON tracking_updates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_updates.shipment_id
      AND shipments.customer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all tracking updates"
  ON tracking_updates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can create tracking updates"
  ON tracking_updates FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update tracking records"
  ON tracking_updates FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE INDEX idx_tracking_updates_shipment_id ON tracking_updates(shipment_id);
CREATE INDEX idx_tracking_updates_status ON tracking_updates(status);
CREATE INDEX idx_tracking_updates_timestamp ON tracking_updates(timestamp);
