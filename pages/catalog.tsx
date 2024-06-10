import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState, useRef } from "react";
import {
  IHeadData,
  IProduct,
  IProductCategory,
  TextResponse,
  fetchCatalogPage,
  fetchMainPage,
  fetchProductsByIdCategory,
  fetchProductsCategories,
} from "/api/wordpressApi";
import Loading from "/components/atoms/Loading/Loading";
import Pagination from "/components/molecules/Pagination/Pagination";
import SeoHead from "/components/molecules/SeoHead/SeoHead";
import PageHead, { PageTypes } from "/components/organisms/Head/Head";
import useMediaQuery from "/hooks/useMediaQuery";

const Catalog = dynamic(() => import("/components/organisms/Catalog/Catalog"), {
  ssr: false,
});
const ContactForm = dynamic(
  () => import("/components/organisms/ContactForm/ContactForm"),
  { ssr: false }
);

interface CatalogPageProps {
  headData: IHeadData;
  initialCategories: IProductCategory[];
  initialProducts: IProduct[];
  contactData: TextResponse;
  initialCategory: IProductCategory | null;
  totalCategoriesCount: number;
  totalProductsCount: number;
  isMobile: boolean;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const userAgent = req.headers["user-agent"] as string;
  const isMobile = /mobile/i.test(userAgent);

  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const categoriesPage = query.categoriesPage
    ? parseInt(query.categoriesPage as string, 10)
    : 1;
  const perPage = isMobile ? 8 : 12;

  try {
    const [headSection, mainPageData, categoriesData] = await Promise.all([
      fetchCatalogPage(),
      fetchMainPage(),
      fetchProductsCategories(categoriesPage, perPage),
    ]);

    const categories = categoriesData.categories;
    const totalCategoriesCount = categoriesData.total;

    const categorySlug = query.category as string;
    let initialProducts: IProduct[] = [];
    let initialCategory: IProductCategory | null = null;
    let totalProductsCount = 0;

    if (categorySlug) {
      initialCategory =
        categories.find((cat) => cat.slug === categorySlug) || null;
      if (initialCategory) {
        const fetchedProducts = await fetchProductsByIdCategory(
          initialCategory.id,
          page,
          perPage
        );
        initialProducts = fetchedProducts.products;
        totalProductsCount = fetchedProducts.total;
      }
    } else {
      const defaultCategory = categories.length > 0 ? categories[0] : null;
      if (defaultCategory) {
        const fetchedProducts = await fetchProductsByIdCategory(
          defaultCategory.id,
          page,
          perPage
        );
        initialProducts = fetchedProducts.products;
        totalProductsCount = fetchedProducts.total;
      }
    }

    const headData =
      headSection.length > 0
        ? {
            title: headSection[0]?.name,
            photo_1: headSection[0]?.acf.photo_1,
            description: headSection[0]?.description,
          }
        : null;

    return {
      props: {
        initialCategories: categories,
        initialProducts,
        contactData:
          mainPageData.find((item) => item.slug === "footer") || null,
        headData,
        initialCategory,
        totalCategoriesCount,
        totalProductsCount,
        isMobile,
      },
    };
  } catch (error) {
    return {
      props: {
        initialCategories: [],
        initialProducts: [],
        contactData: null,
        headData: null,
        initialCategory: null,
        totalCategoriesCount: 0,
        totalProductsCount: 0,
        isMobile,
      },
    };
  }
};

const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategories,
  initialProducts,
  contactData,
  headData,
  initialCategory,
  totalCategoriesCount,
  totalProductsCount,
  isMobile,
}) => {
  const router = useRouter();
  const clientIsMobile = useMediaQuery("(max-width: 640px)");
  const perPage = isMobile || clientIsMobile ? 8 : 12;

  const [selectedCategory, setSelectedCategory] =
    useState<IProductCategory | null>(initialCategory);
  const [categories, setCategories] =
    useState<IProductCategory[]>(initialCategories);
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPageProducts, setCurrentPageProducts] = useState(1);
  const [totalPagesProducts, setTotalPagesProducts] = useState(
    Math.ceil(totalProductsCount / perPage)
  );
  const [currentPageCategories, setCurrentPageCategories] = useState(1);
  const [totalPagesCategories, setTotalPagesCategories] = useState(
    Math.ceil(totalCategoriesCount / perPage)
  );

  const pageHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = router.query.page
      ? parseInt(router.query.page as string, 10)
      : 1;
    const categoriesPage = router.query.categoriesPage
      ? parseInt(router.query.categoriesPage as string, 10)
      : 1;
    setCurrentPageProducts(page);
    setCurrentPageCategories(categoriesPage);
  }, [router.query.page, router.query.categoriesPage]);

  const scrollToPageHeadEnd = () => {
    if (pageHeadRef.current) {
      const { bottom } = pageHeadRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + bottom,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = async (category: IProductCategory) => {
    setLoadingProducts(true);
    setSelectedCategory(category);

    const fetchedProducts = await fetchProductsByIdCategory(
      category.id,
      1,
      perPage
    );
    setProducts(fetchedProducts.products);
    setTotalPagesProducts(Math.ceil(fetchedProducts.total / perPage));

    setLoadingProducts(false);
    router.push(`/catalog?category=${category.slug}&page=1`, undefined, {
      shallow: true,
    });

    scrollToPageHeadEnd();
  };

  const handlePageChangeProducts = async (page: number) => {
    setLoadingProducts(true);
    setCurrentPageProducts(page);

    if (selectedCategory) {
      const fetchedProducts = await fetchProductsByIdCategory(
        selectedCategory.id,
        page,
        perPage
      );
      setProducts(fetchedProducts.products);
      setTotalPagesProducts(Math.ceil(fetchedProducts.total / perPage));
    }

    setLoadingProducts(false);
    router.push(
      `/catalog?category=${selectedCategory?.slug}&page=${page}`,
      undefined,
      { shallow: true }
    );
    scrollToPageHeadEnd();
  };

  const handlePageChangeCategories = async (page: number) => {
    setLoadingProducts(true);
    setCurrentPageCategories(page);

    const fetchedCategories = await fetchProductsCategories(page, perPage);
    setCategories(fetchedCategories.categories);
    setTotalPagesCategories(Math.ceil(fetchedCategories.total / perPage));

    setLoadingProducts(false);
    router.push(`/catalog?categoriesPage=${page}`, undefined, {
      shallow: true,
    });

    scrollToPageHeadEnd();
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setProducts(initialProducts);
    setTotalPagesProducts(Math.ceil(totalProductsCount / perPage));
    router.push("/catalog", undefined, { shallow: true });

    scrollToPageHeadEnd();
  };

  return (
    <>
      <SeoHead headData={headData} />
      <PageHead
        pageType={PageTypes.CATALOG}
        mainHeadData={headData}
        categoryName={selectedCategory?.name}
        headRef={pageHeadRef}
      />
      <Suspense fallback={<Loading />}>
        <Catalog
          categories={categories}
          products={products}
          loading={loadingProducts}
          onCategoryClick={handleCategoryClick}
          handleBackClick={handleBackClick}
          selectedCategory={selectedCategory}
        />
        {!selectedCategory && totalPagesCategories > 1 && (
          <Pagination
            currentPage={currentPageCategories}
            totalPages={totalPagesCategories}
            onPageChange={handlePageChangeCategories}
          />
        )}
        {selectedCategory && totalPagesProducts > 1 && (
          <Pagination
            currentPage={currentPageProducts}
            totalPages={totalPagesProducts}
            onPageChange={handlePageChangeProducts}
          />
        )}
      </Suspense>
      <ContactForm contactData={contactData} />
    </>
  );
};

export default CatalogPage;
