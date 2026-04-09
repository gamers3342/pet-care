export interface SeedClinic {
  name: string;
  address: string;
  area?: string;
  contact_no?: string;
  email?: string;
  vet_name?: string;
}

export const clinicsSeed: SeedClinic[] = [
  {
    name: 'Sneh Pet Hospital',
    address: 'Trinity Complex, Hebatpur Rd, Thaltej',
    area: 'Thaltej',
    contact_no: '+91 79 2685 4321'
  },
  {
    name: "Dr. Chirag Dave's Pet Clinic",
    address: 'Ravija Plaza, Thaltej-Shilaj Rd',
    area: 'Thaltej',
    contact_no: '+91 79 2685 7890'
  },
  {
    name: "Dr. Tina Giri's Vet Clinic",
    address: 'Akshar Complex, Jodhpur Village',
    area: 'Satellite',
    contact_no: '+91 79 2630 1234'
  },
  {
    name: "Dr. J.D.'s Pet Clinic",
    address: 'Shaktikrupa Society Part-2, Chandkheda',
    area: 'Chandkheda',
    contact_no: '+91 79 2764 5678'
  },
  {
    name: "Dr. Gautam's Dog Clinic & Hospital",
    address: 'Tragad Rd, Chandkheda',
    area: 'Chandkheda',
    contact_no: '+91 79 2764 9012'
  },
  {
    name: 'Caring Paws Vet Clinic & Surgical Centre',
    address: 'Panjara Pol, Ambawadi',
    area: 'Ambawadi',
    contact_no: '+91 79 2656 3456'
  },
  {
    name: 'Woofy & Vet Pet Clinic and Shop',
    address: 'New CG Rd, Chandkheda',
    area: 'Chandkheda',
    contact_no: '+91 79 2764 7890'
  },
  {
    name: 'BestBuds Pet Hospital',
    address: 'New Sharda Mandir Rd, Paldi',
    area: 'Paldi',
    contact_no: '+91 79 2658 1234'
  },
  {
    name: 'Pets & Paws Vet Hospital',
    address: 'Maple Tree, Sal Hospital Rd, Thaltej',
    area: 'Thaltej',
    contact_no: '+91 79 2685 5678'
  },
  {
    name: 'New Hope Animal Hospital',
    address: 'Om Tower, Satellite Rd',
    area: 'Satellite',
    contact_no: '+91 79 2630 9876'
  }
];

