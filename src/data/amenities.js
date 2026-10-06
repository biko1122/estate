import {
  Waves, Car, ShieldCheck, Trees, Fence, AirVent, ArrowUpDown, HouseWifi,
  Dumbbell, Umbrella, ConciergeBell, CookingPot, Baby, Cctv, Sun, Sofa,
} from 'lucide-react'

// Every amenity a listing can reference, keyed by a stable id the backend can reuse.
export const amenities = {
  pool: { label: 'Swimming pool', icon: Waves },
  parking: { label: 'Covered parking', icon: Car },
  security: { label: '24/7 security', icon: ShieldCheck },
  garden: { label: 'Private garden', icon: Trees },
  balcony: { label: 'Balcony', icon: Fence },
  ac: { label: 'Central AC', icon: AirVent },
  elevator: { label: 'Elevator', icon: ArrowUpDown },
  smart: { label: 'Smart home', icon: HouseWifi },
  gym: { label: 'Gym', icon: Dumbbell },
  beach: { label: 'Beach access', icon: Umbrella },
  maid: { label: "Maid's room", icon: ConciergeBell },
  kitchen: { label: 'Fitted kitchen', icon: CookingPot },
  kids: { label: 'Kids area', icon: Baby },
  cctv: { label: 'CCTV', icon: Cctv },
  roof: { label: 'Roof terrace', icon: Sun },
  furnished: { label: 'Fully furnished', icon: Sofa },
}

// The subset offered in the "More filters" panel
export const filterableAmenities = ['pool', 'garden', 'parking', 'security', 'smart', 'elevator', 'furnished', 'beach']
