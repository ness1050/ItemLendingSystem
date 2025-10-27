

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    address?:string;
    createdAt: Date;
}

export interface item {
    id: string;
    name: string;
    description: string;
    category: string;
    condition: "New" | "Used" | "Good" | "Damaged";
    ownerId: string;
    isAvailable: boolean;
    createdAt: Date;

}

export interface Contract {
    id: string;
    itemId: string;
    leenderId: string;
    borrowerId: string;
    startDate: Date;
    endDate: Date;
    status?: "Loaned" | "Available" |"Completed" | "Actice";
    terms?: string;
    createdAt : Date;
}

export interface Review {
    id: string;
    contractId: string;
    review: String;
    rating: number;
    comment?: string;
    createdAt: Date;
}