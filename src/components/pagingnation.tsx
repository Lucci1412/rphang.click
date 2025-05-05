import { useRouter } from "next/navigation"; // Import router
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationCustomProps {
  currentPage: number;
  totalPage: number;
  limit?: number;
}

export function PaginationCustom(props: PaginationCustomProps) {
  const { currentPage, totalPage } = props;
  const router = useRouter();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPage) return;

    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/\/page\/\d+$/, ""); // bỏ phần /page/2

    router.push(`${basePath}/page/${page}`);
  };

  const renderPages = () => {
    const pages = [];
    const maxPageToShow = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageToShow / 2));
    let endPage = startPage + maxPageToShow - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={(e) => {
              e.preventDefault();
              goToPage(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationEllipsis />}
          </>
        )}
        {pages}
        {endPage < totalPage && (
          <>
            {endPage < totalPage - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(totalPage);
                }}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    );
  };

  return (
    <div className="mt-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
