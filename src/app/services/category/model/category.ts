import { CategoryDescription } from './category-description';

export class Category {

    code:string;
    description:CategoryDescription;
    children:Category[];
}
