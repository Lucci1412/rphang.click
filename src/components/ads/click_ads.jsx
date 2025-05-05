'use client'
import { useEffect } from 'react';

const AdScript = () => {
  useEffect(() => {
    // Kiểm tra nếu quảng cáo đã được hiển thị trong session hiện tại
    const adShown = sessionStorage.getItem('adShown');

    // Nếu chưa hiển thị, thêm quảng cáo vào trang và đánh dấu là đã hiển thị
    if (!adShown) {
      const script = document.createElement('script');
      script.src = 'https://ligheechoagool.com/88/tag.min.js';
      script.setAttribute('data-zone', '145679');
      script.setAttribute('async', 'true');
      script.setAttribute('data-cfasync', 'false');
      document.head.appendChild(script);

      // Lưu trạng thái quảng cáo đã hiển thị vào sessionStorage
      sessionStorage.setItem('adShown', 'true');
    }
  }, []);

  return null; // Component không cần render gì
};

export default AdScript;