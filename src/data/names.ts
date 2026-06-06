export interface RegionalNames {
  firstNamesMale: string[];
  firstNamesFemale: string[];
  lastNames: string[];
}

export const INDIAN_NAMES: Record<string, RegionalNames> = {
  North: {
    firstNamesMale: ['Aarav', 'Rahul', 'Amit', 'Vikram', 'Rohit', 'Sanjay', 'Aditya', 'Harsh', 'Dev', 'Manish', 'Kunal', 'Kabir', 'Rohan', 'Abhishek', 'Ishaan'],
    firstNamesFemale: ['Priya', 'Sneha', 'Neha', 'Pooja', 'Anjali', 'Kiran', 'Ritu', 'Simran', 'Tanvi', 'Ishita', 'Khushi', 'Divya', 'Aanya', 'Kriti', 'Aditi'],
    lastNames: ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Trivedi', 'Yadav', 'Mishra', 'Pandey', 'Bansal', 'Kapoor', 'Malhotra', 'Aggarwal', 'Chawla']
  },
  South: {
    firstNamesMale: ['Karthik', 'Ashwin', 'Ramesh', 'Vijay', 'Venkat', 'Siddharth', 'Hari', 'Adithya', 'Madhavan', 'Balaji', 'Pranav', 'Suresh', 'Kiran', 'Nithin', 'Arjun'],
    firstNamesFemale: ['Meenakshi', 'Lakshmi', 'Divya', 'Shruti', 'Anusha', 'Deepa', 'Gayatri', 'Kavitha', 'Sandhya', 'Harini', 'Pooja', 'Nandhini', 'Sruthi', 'Sneha', 'Keerthi'],
    lastNames: ['Iyer', 'Reddy', 'Nair', 'Iyengar', 'Menon', 'Rao', 'Pillai', 'Shetty', 'Murthy', 'Naidu', 'Subramanian', 'Krishnan', 'Balakrishnan', 'Swamy', 'Choudhary']
  },
  West: {
    firstNamesMale: ['Parth', 'Harshal', 'Rohan', 'Chinmay', 'Chirag', 'Tushar', 'Aditya', 'Jay', 'Pratik', 'Saurabh', 'Karan', 'Dhruv', 'Siddhesh', 'Aniket', 'Shreyas'],
    firstNamesFemale: ['Anjali', 'Shraddha', 'Riya', 'Komal', 'Prachi', 'Tanvi', 'Sakshi', 'Priyanka', 'Neha', 'Snehal', 'Ishani', 'Manasi', 'Disha', 'Vaidehi', 'Purvi'],
    lastNames: ['Patel', 'Shah', 'Mehta', 'Gokhale', 'Deshmukh', 'Kulkarni', 'Joshi', 'Sawant', 'Sanghvi', 'Vyas', 'Shinde', 'Pawar', 'More', 'Chavan', 'Solanki']
  },
  East: {
    firstNamesMale: ['Subhash', 'Debashish', 'Joy', 'Sourav', 'Aritra', 'Anirban', 'Sujit', 'Abhijit', 'Prabir', 'Bikram', 'Rajesh', 'Sayan', 'Prabal', 'Ritam', 'Nilanjan'],
    firstNamesFemale: ['Ananya', 'Riya', 'Payal', 'Debolina', 'Mimi', 'Pooja', 'Sreemoyee', 'Tanusree', 'Soma', 'Aditi', 'Sneha', 'Monika', 'Koyel', 'Jhumur', 'Paramita'],
    lastNames: ['Banerjee', 'Chatterjee', 'Sen', 'Dutta', 'Das', 'Mukherjee', 'Bose', 'Roy', 'Choudhury', 'Ganguly', 'Ghosh', 'Sarkar', 'Mitra', 'Chakraborty', 'Paul']
  }
};

export const INTERNATIONAL_NAMES: Record<string, { firstNamesMale: string[], firstNamesFemale: string[], lastNames: string[] }> = {
  USA: {
    firstNamesMale: ['John', 'Michael', 'David', 'James', 'Robert', 'William', 'Daniel', 'Matthew', 'Joseph', 'Andrew'],
    firstNamesFemale: ['Emily', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Charlotte', 'Amelia', 'Harper'],
    lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor']
  },
  UK: {
    firstNamesMale: ['Harry', 'Oliver', 'Jack', 'George', 'Charlie', 'Jacob', 'Thomas', 'Noah', 'William', 'James'],
    firstNamesFemale: ['Amelia', 'Olivia', 'Isla', 'Emily', 'Ava', 'Lily', 'Mia', 'Sophia', 'Isabella', 'Grace'],
    lastNames: ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Thomas', 'Wilson', 'Johnson']
  },
  Germany: {
    firstNamesMale: ['Maximilian', 'Alexander', 'Paul', 'Elias', 'Ben', 'Leon', 'Lukas', 'Jonas', 'Felix', 'Noah'],
    firstNamesFemale: ['Marie', 'Sophie', 'Maria', 'Sophia', 'Emilia', 'Emma', 'Hannah', 'Mia', 'Anna', 'Lena'],
    lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann']
  },
  UAE: {
    firstNamesMale: ['Mohammed', 'Ahmed', 'Ali', 'Hamdan', 'Zayed', 'Sultan', 'Khalid', 'Saeed', 'Abdullah', 'Faisal'],
    firstNamesFemale: ['Fatima', 'Maryum', 'Aisha', 'Latifa', 'Shamma', 'Reem', 'Meera', 'Hessa', 'Maha', 'Sara'],
    lastNames: ['Al Maktoum', 'Al Nahyan', 'Al Qasimi', 'Al Suwaidi', 'Al Mansoori', 'Al Harbi', 'Al Hashimi', 'Al Zaabi']
  },
  Japan: {
    firstNamesMale: ['Haruto', 'Sota', 'Yuto', 'Riku', 'Haruki', 'Kaito', 'Asahi', 'Itsuki', 'Ren', 'Yuma'],
    firstNamesFemale: ['Himari', 'Hina', 'Yua', 'Sakura', 'Ichika', 'Akari', 'Sara', 'Yui', 'Niko', 'Mei'],
    lastNames: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato']
  }
};

export const CITIES_BY_REGION: Record<string, string[]> = {
  North: ['Delhi', 'Jaipur', 'Lucknow'],
  South: ['Bangalore', 'Chennai', 'Hyderabad'],
  West: ['Mumbai', 'Pune', 'Ahmedabad'],
  East: ['Kolkata']
};

export const getRegionOfCity = (city: string): string => {
  for (const region in CITIES_BY_REGION) {
    if (CITIES_BY_REGION[region].includes(city)) {
      return region;
    }
  }
  return 'North'; // Default
};
