import { watchForPageChanges, fetchPage, PageDocument } from '@twilify/sdk';
import { ref } from 'vue';

export const useTwilifyPage = <T extends Record<string, any>>(
  slug: string,
  options: Record<string, any>
) => {
  const pagePromise = fetchPage<T>(slug, options);

  const page = ref<null | PageDocument<T>>();

  pagePromise.then((data) => {
    page.value = data;
  });

  watchForPageChanges(slug, (content) => {
    page.value ? Object.assign(page.value.content, content) : {};
  });

  return {
    ...pagePromise,
    data: page,
  };
};
