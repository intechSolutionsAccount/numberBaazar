export const businessNumber: string = '9158585858';

type Address = {
    line1: string;
    line2: string;
    line3: string;
};

interface OwnerInfo {
    email_id: string;
    mobile_no: string;
    Address: Address;
}

export const ownerInfo: OwnerInfo = {
    email_id: 'premdhobe98@gmail.com',
    mobile_no: '919158585858',
    Address: {
        line1: 'Shop No.4, Neelkamal Building',
        line2: 'Solapur Road, Hadapsar',
        line3: 'Pune 411028'
    }
};