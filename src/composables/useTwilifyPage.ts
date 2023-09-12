import { watchForPageChanges, fetchPage } from '@twilify/sdk';
import { ref } from 'vue';

export const useTwilifyPage = <T>(
  slug: string,
  options: Record<string, any>
) => {
  const pagePromise = fetchPage(slug, options);

  const page = ref<null | Awaited<typeof pagePromise>>(null);

  pagePromise.then((data) => {
    page.value = data;
  });

  watchForPageChanges(slug, (content) => {
    Object.assign(page.value.content, content);
  });

  return {
    ...pagePromise,
    data: page,
  };
};
