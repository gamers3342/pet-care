export interface SeedService {
  name: string;
  address: string;
  contact_no?: string;
  email?: string;
}

export const servicesSeed: SeedService[] = [
  { name: 'Pawfect Groomers', address: 'Vastrapur Lake Road, Vastrapur', contact_no: '+91 79 2200 1111' },
  { name: 'Fluffy Spa & Grooming', address: 'Sindhu Bhavan Road, Bodakdev', contact_no: '+91 79 2200 2222' },
  { name: 'Wag & Wash', address: 'CG Road, Navrangpura', contact_no: '+91 79 2200 3333' },
  { name: 'Happy Tails Grooming Lounge', address: 'Shyamal Cross Road, Satellite', contact_no: '+91 79 2200 4444' },
  { name: 'Paws & Relax Grooming Studio', address: 'Drive-In Road, Memnagar', contact_no: '+91 79 2200 5555' }
];

