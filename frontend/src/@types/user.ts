// ----------------------------------------------------------------------

export type IUserSocialLink = {
    facebookLink: string;
    instagramLink: string;
    linkedinLink: string;
    twitterLink: string;
};
// ----------------------------------------------------------------------

export type IUserCard = {
    id: string;
    avatarUrl: string;
    cover: string;
    name: string;
    follower: number;
    following: number;
    totalPosts: number;
    role: string;
};

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
    id: string;
    avatarUrl: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    company: string;
    isVerified: boolean;
    status: string;
    role: string;
};

export type IUserAccountBillingCreditCard = {
    id: string;
    cardNumber: string;
    cardType: string;
};

export type IUserAccountBillingInvoice = {
    id: string;
    createdAt: Date | string | number;
    price: number;
};

export type IUserAccountBillingAddress = {
    id: string;
    name: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
};

export type IUserAccountChangePassword = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
    activityComments: boolean;
    activityAnswers: boolean;
    activityFollows: boolean;
    applicationNews: boolean;
    applicationProduct: boolean;
    applicationBlog: boolean;
};

// ----------------------------------------------------------------------

export type IUserData = {
    id: string;
    name: string;
    email: string;
    role: string;
    employee_id: string;
    createdAt: Date | string ;
    updatedAt: Date | string ;
    deletedAt: Date | string ;
    avatar: string;
    status: string;
}

export type IUserState = {
    isLoading: boolean;
    error: string | null;
    users: IUserData[];
    user: IUserData | null;
}
