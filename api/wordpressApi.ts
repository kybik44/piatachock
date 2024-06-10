import apiClient from './apiConfig';

export interface IFormResponse {
  contact_form_id: number;
  status: "mail_sent" | "validation_failed";
  message: string;
  invalid_fields: {
    field: string;
    message: string;
    idref: string | null;
    error_id: string;
  }[];
  posted_data_hash: string;
  into: string;
}



export interface IAboutData {
  title: string;
  text: string;
  photo1: string;
}

export interface IHaveItem {
  text: string;
  title: string;
}

export interface ITermsData {
  text: string;
  title: string;
  photo: string;
}

export interface IWholesaleData {
  title: string;
  text: string;
  photo1: string;
  photo2: string;
}

export interface IMobileAppData {
  title: string;
  text: string;
  photo1: string;
}

export interface IManagersData {
  title: string;
  managers: ILeader[];
  text: string;
}

export interface IBestSellersData {
  title: string;
  items: IProduct[];
}

export interface IFaqData {
  title: string;
  items: IFaqItem[];
}

export interface IHaveData {
  title: string;
  items: IHaveItem[];
}

export interface IProductCategory {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
}

export interface IHeadItem {
  title: string;
  content: {
    text: string;
    background: string;
  };
}

export interface IHeadData {
  title: string;
  content?: string;
  photo_1?: string;
  blocks?: Array<{ name: string; description: string }>;
  description?: string;
}


export interface IWholesaleData {
  title: string;
  content?: IHeadItem;
}

export interface IReviewData {
  id: number;
  acf: {
    author: string;
    feedback: string;
  };
}

export interface IShopsItem {
  id: number,
  name: string,
  acf: {
    city: string;
    district: string;
    address: string;
    working_hours: string;
    weekend_hours: string;
    coordinates: string;
    photo: {
      link: string;
    }
  }
}

export interface IShopsData {

}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  permalink: string;
  acf: {
    weight: string | null;
    type: string | null;
    photo: string | null;
  };
  attributes: {
    id: number;
    slug: string;
    options: string[];
  }[];
}

export interface TextResponse {
  id: number;
  slug: string;
  name: string;
  description: string;
  acf: {
    text: string;
    [key: string]: any;
  };
}

export interface IContactData {
  id: number;
  acf: {
    name: string;
    comment: string;
    value: string;
  };
}

export interface ILeader {
  position: string;
  name: string;
  image: string;
}

export interface IFaqItem {
  question: string;
  answer: string;
}

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(`Could not fetch data for ${url}.`);
  }
}

export async function fetchMainPage(): Promise<TextResponse[]> {
  return fetchData('/wp/v2/main_acf?_fields=id,slug,acf,name,description');
}

export async function fetchProductsCategories(
  page: number = 1,
  perPage: number = 12
): Promise<{ categories: IProductCategory[], total: number }> {
  const response = await apiClient.get(
    `/wc/v3/products/categories?_fields=id,name,slug,image.src&page=${page}&per_page=${perPage}`
  );

  const total = parseInt(response.headers["x-wp-total"] || '0', 10);

  return { categories: response.data, total };
}

export async function fetchProductsByIdCategory(
  categoryId: number,
  page: number = 1,
  perPage: number = 12
): Promise<{ products: IProduct[], total: number }> {
  const response = await apiClient.get(
    `/wc/v3/products?category=${categoryId}&_fields=id,name,description,permalink,acf&page=${page}&per_page=${perPage}`
  );

  const total = parseInt(response.headers["x-wp-total"] || '0', 10);

  return { products: response.data, total };
}

export async function fetchProductById(id: number): Promise<IProduct> {
  return fetchData(`/wc/v3/products/${id}?_fields=id,name,slug,description,acf,attributes`);
}
export async function fetchWholesalePage(): Promise<TextResponse[]> {
  return fetchData('/wp/v2/optovaya_acf?_fields=id,name,slug,acf.text,acf.photo_1,description');
}
export async function fetchMarketPage(): Promise<TextResponse[]> {
  return fetchData('/wp/v2/branded_trade_acf?_fields=id,name,slug,acf.text,acf.photo_1,description');
}

export async function fetchCatalogPage(): Promise<TextResponse[]> {
  return fetchData('/wp/v2/catalog_page_acf?_fields=id,name,acf.photo_1,description');
}
export async function fetchContactsPage(): Promise<TextResponse[]> {
  return fetchData('/wp/v2/contacts_page_acf?_fields=id,name,acf.photo_1,description');
}

export async function fetchReviews(): Promise<IReviewData[]> {
  return fetchData('/wp/v2/feedbacks_acf?_fields=id,acf');
}
export async function fetchShops(): Promise<IShopsItem[]> {
  return fetchData('/wp/v2/stores_acf?_fields=id,name,acf.city,acf.district,acf.address,acf.working_hours,acf.weekend_hours,acf.photo.link,acf.coordinates');
}

export async function fetchContacts(): Promise<any[]> {
  return fetchData('/wp/v2/contacts_acf?_fields=id,name,acf');
}

export async function fetchFaq(): Promise<IFaqItem[]> {
  return fetchData('/wp/v2/frequently_qa_acf?_fields=id,acf');
}

export async function sendForm(formData: any): Promise<IFormResponse> {
  try {
    const response = await apiClient.post<IFormResponse>(
      "/contact-form-7/v1/contact-forms/181/feedback",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error sending form:", error);
    throw new Error("Could not send feedback.");
  }
}