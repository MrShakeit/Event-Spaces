export interface Space {
  name: string;
  address: {
    city: string;
    street: string;
    number: string;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  resident_price: number;
  image: string;
  images: string[];
  videos: string[];
  description?: string;
  is_deleted: boolean;
  is_blocked: boolean;
}

/*
Rates, 
Other Venue Information (ingress/egress info, penalties)  
contact person, 
contact information*/
