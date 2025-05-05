import {  FallbackProps } from "react-error-boundary";

// Định nghĩa component fallback đúng cách
export const MovieErrorBoundary = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Kiểm tra nếu đó là lỗi TRPC với mã NOT_FOUND
  console.log(error);
  if (error?.name === "TRPCError" && error?.data?.code === "NOT_FOUND") {
    return (
      <div>
        <p>Không tìm thấy phim phù hợp với tiêu chí tìm kiếm của bạn</p>
        <button onClick={resetErrorBoundary}>Thử lại</button>
      </div>
    );
  }
  
  // Trường hợp lỗi khác
  return (
    <div>
      <p>Đã xảy ra lỗi</p>
      <button onClick={resetErrorBoundary}>Thử lại</button>
    </div>
  );
};
