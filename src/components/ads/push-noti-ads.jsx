'use client'
import { useEffect } from 'react';
//thông báo đẩy 
const AdSPushNoti = () => {
  useEffect(() => {
    // Kiểm tra thời gian giữa các lần hiển thị quảng cáo
    const lastAdTime = sessionStorage.getItem('lastAdTime');
    const currentTime = Date.now();

    // Nếu quảng cáo chưa được hiển thị trong 5 phút qua
    if (!lastAdTime || currentTime - parseInt(lastAdTime, 10) > 5 * 60 * 1000) {
      // Thêm mã quảng cáo vào trang
      const script = document.createElement('script');
      script.src = 'https://couphaithuph.net/act/files/tag.min.js?z=9290325';
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('async', 'true');
      document.head.appendChild(script);

      // Lưu thời gian hiển thị quảng cáo vào sessionStorage
      sessionStorage.setItem('lastAdTime', currentTime.toString());
    }
  }, []);

  return null; // Component không cần render gì
};

export default AdSPushNoti;
