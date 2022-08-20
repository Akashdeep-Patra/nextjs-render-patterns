export interface IPost {
  id: string;
  image: string;
  likes: number;
  owner: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  publishDate: string;
  tags: Array<string>;
  text: string;
}
