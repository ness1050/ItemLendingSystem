const contracts = [
  {
    id: "c1",
    item: {
      name: "Drill Machine",
      imageUrl: "https://images.unsplash.com/photo-1616627989733-0d2a15d0c93c?auto=format&fit=crop&w=800&q=80",
    },
    lender: { name: "Alice" },
    borrower: { name: "Bob" },
    startDate: "2025-10-20",
    endDate: "2025-10-27",
    status: "Active",
    terms: "Return with batteries included",
  },
  {
    id: "c2",
    item: {
      name: "Camera",
      imageUrl: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=800&q=80",
    },
    lender: { name: "Bob" },
    borrower: { name: "Alice" },
    startDate: "2025-09-10",
    endDate: "2025-09-20",
    status: "Completed",
    terms: "No scratches or damages",
  },
];

export default contracts;
