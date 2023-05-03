import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
);
const article: Article = {
  id: '1',
  img: 'https://arduinomaster.ru/wp-content/uploads/2018/01/python.jpg',
  blocks: [],
  type: [],
  user: { id: '1', username: '123' },
  views: 123,
  createdAt: '',
  title: '123',
  subtitle: 'sfsd',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/articles?_limit=3',
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
  loki: { skip: true },
};
// Normal.parameters = { loki: { skip: true } };
