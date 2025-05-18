import MovieDetailLayout from "@/modules/movie-detail/ui/layout/movie-detail-layout";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <MovieDetailLayout>{children}</MovieDetailLayout>;
};

export default Layout;