export interface Space {
  name: string;
  address: {
    city: string;
    street: string;
    number: number;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  image: string;
  images: string[];
  description?: string;
}
