export type UserType = 'customer' | 'admin'

export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  user_type: UserType
  company_name?: string
  address?: string
  city?: string
  state?: string
  country?: string
  created_at: string
  updated_at: string
}

export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'cancelled'
export type ShipmentType = 'travel' | 'cargo'

export interface Shipment {
  id: string
  tracking_number: string
  customer_id: string
  shipment_type: ShipmentType
  origin_location: string
  destination_location: string
  status: ShipmentStatus
  current_location: string
  estimated_delivery_date: string
  actual_delivery_date?: string
  package_weight?: number
  package_dimensions?: string
  description: string
  cost: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface TrackingUpdate {
  id: string
  shipment_id: string
  status: ShipmentStatus
  location: string
  latitude?: number
  longitude?: number
  description: string
  timestamp: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  service_type: ShipmentType
  price_from?: number
  icon: string
  created_at: string
}

export interface Testimonial {
  id: string
  customer_id: string
  shipment_id?: string
  rating: number
  title: string
  message: string
  is_approved: boolean
  created_at: string
}
