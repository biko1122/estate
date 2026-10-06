import { P } from './photos'

export const agents = [
  {
    id: 'karim',
    name: 'Karim Mansour',
    role: 'Founder & Managing Partner',
    photo: P.karim,
    phone: '+20 100 555 0101',
    email: 'karim@sarayestates.com',
    focus: 'Luxury villas · Sheikh Zayed',
    bio: 'Founded Saray in 2014 after a decade in development sales. Handles the agency’s exclusive mandates personally.',
    years: 18,
  },
  {
    id: 'laila',
    name: 'Laila Hassan',
    role: 'Head of Sales, East Cairo',
    photo: P.laila,
    phone: '+20 100 555 0117',
    email: 'laila@sarayestates.com',
    focus: 'New Cairo · Maadi',
    bio: 'Leads the New Cairo team and has closed more than 220 resale transactions in the Fifth Settlement alone.',
    years: 11,
  },
  {
    id: 'tarek',
    name: 'Tarek Samir',
    role: 'Senior Consultant, North Coast',
    photo: P.tarek,
    phone: '+20 100 555 0123',
    email: 'tarek@sarayestates.com',
    focus: 'Coastal homes · Holiday lets',
    bio: 'Spends every summer on the coast. Advises buyers on resale chalets and manages seasonal rentals for owners.',
    years: 8,
  },
  {
    id: 'yasmine',
    name: 'Yasmine Adel',
    role: 'Leasing Manager',
    photo: P.yasmine,
    phone: '+20 100 555 0139',
    email: 'yasmine@sarayestates.com',
    focus: 'Rentals · Relocation',
    bio: 'Helps families and corporate tenants relocate to Cairo, from shortlisting homes to negotiating the lease.',
    years: 7,
  },
]

export function getAgent(id) {
  return agents.find((a) => a.id === id) ?? agents[0]
}
