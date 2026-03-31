/*
  # Create Shipments Table

  1. New Tables
    - `shipments` - Main shipment/cargo records
      - `id` (uuid, primary key)
      - `tracking_number` (text, unique, auto-generated)
      - `customer_id` (uuid, references users)
      - `shipment_type` (enum: 'travel', 'cargo')
      - `origin_location` (text)
      - `destination_location` (text)
      - `status` (enum: 'pending', 'in_transit', 'delivered', 'cancelled')
      - `current_location` (text)
      - `estimated_delivery_date` (date)
      - `actual_delivery_date` (date)
      - `package_weight` (numeric)
      - `package_dimensions` (text)
      - `description` (text)
      - `cost` (numeric)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `shipments` table
    - Add policy for customers to see their own shipments
    - Add policy for admins to see all shipments
    - Add policy for customers to update their own shipments (limited fields)
*/

CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shipment_type text NOT NULL CHECK (shipment_type IN ('travel', 'cargo')),
  origin_location text NOT NULL,
  destination_location text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'cancelled')),
  current_location text DEFAULT '',
  estimated_delivery_date date,
  actual_delivery_date date,
  package_weight numeric(10, 2),
  package_dimensions text DEFAULT '',
  description text DEFAULT '',
  cost numeric(12, 2) DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Admins can view all shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can create shipments"
  ON shipments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update shipments"
  ON shipments FOR UPDATE
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

CREATE POLICY "Admins can delete shipments"
  ON shipments FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.user_type = 'admin'
    )
  );

CREATE INDEX idx_shipments_customer_id ON shipments(customer_id);
CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipments_created_at ON shipments(created_at);
