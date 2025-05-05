import Script from 'next/script';
import React from 'react';

const ToastBanner = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-72 bg-white border-r-2 border-gray-300 z-50">
      <Script
        id="toast-banner"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9290674,document.createElement('script'))`,
        }}
      />
    </div>
  );
};

export default ToastBanner;

