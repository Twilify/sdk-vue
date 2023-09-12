import { watchForPageChanges, fetchPage } from '@twilify/sdk';
import { ref } from 'vue';

export const useAsyncTwilifyPage = async <T>(
  slug: string,
  options: Record<string, any>
) => {
  const page = ref(await fetchPage(slug, options));

  watchForPageChanges(slug, (content) => {
    Object.assign(page.value.content, content);
  });

  return page;
};
