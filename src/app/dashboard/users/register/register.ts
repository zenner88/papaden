export interface Register {
  "status": boolean,
  "id": number,
  "fullname": string,
  "born_city": string,
  "born_date": Date,
  "sex_category_title": string,
  "phone": string,
  "email": string,
  "password": string,
  "created_on": Date,
  "updated_on": Date
}

export interface RegisterIDS {
  "id": number
}

export interface CreateRegister {
  "status": boolean,
  "fullname": string,
  "born_city": string,
  "born_date": Date,
  "sex_category_title": string,
  "phone": string,
  "email": string,
  "password": string,
  "created_on": Date,
  "updated_on": Date
}
