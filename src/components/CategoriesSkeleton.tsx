import ContentLoader from 'react-content-loader';

const CategoriesSkeleton = () => (
  <ContentLoader
    speed={2}
    width={100}
    height={32}
    viewBox="0 0 100 32"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="20" ry="20" width="100" height="32" />
  </ContentLoader>
);

export default CategoriesSkeleton;
