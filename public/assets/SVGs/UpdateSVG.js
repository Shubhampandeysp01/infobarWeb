import React from 'react';

const MySvgComponent = () => {
  const svgString = `<?xml version="1.0" ?><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#00659d;}.cls-2{fill:#bdecdc;}.cls-3{fill:#338dbf;}.cls-4{fill:#59cea7;}.cls-5{fill:#cbe2ef;}.cls-6{fill:#46c89d;}.cls-7{fill:#a1c9bc;}.cls-8{fill:#2c78a3;}.cls-9{fill:#4cb08e;}.cls-10{fill:#00b378;}.cls-11{fill:#096;}</style></defs><title/><g data-name="/ FLAT" id="_FLAT"><path class="cls-1" d="M56,144H408a32,32,0,0,1,32,32V456.00006A31.99994,31.99994,0,0,1,408.00006,488H56a32,32,0,0,1-32-32V176a32,32,0,0,1,32-32Z"/><path class="cls-2" d="M435.31372,75.31372,388.68628,28.68628A15.99933,15.99933,0,0,0,377.37256,24H128a16.00008,16.00008,0,0,0-16,16V224H440V86.62744A15.99967,15.99967,0,0,0,435.31372,75.31372Z"/><path class="cls-3" d="M456,216H120a32,32,0,0,0-32,32V456a32.00012,32.00012,0,0,1-31.99994,32H456a32.00018,32.00018,0,0,0,32-32V248A32,32,0,0,0,456,216Z"/><rect class="cls-4" height="16" width="232" x="136" y="96"/><rect class="cls-4" height="16" width="280" x="136" y="136"/><rect class="cls-4" height="16" width="280" x="136" y="176"/><rect class="cls-4" height="16" width="216" x="136" y="56"/><path class="cls-5" d="M241.14014,307.88379l-15.61335,26.02246a64.01224,64.01224,0,0,1,96.59089-68.06445l8.543-13.5293A79.98448,79.98448,0,0,0,209.20532,333.794l-21.08911-12.6543-8.23242,13.7207,46.86035,28.11524,28.11572-46.85938Z"/><path class="cls-5" d="M396.11621,305.13965l-46.86035-28.11524-28.11572,46.85938,13.71972,8.23242,15.61768-26.02978a64.01647,64.01647,0,0,1-96.93311,67.85791L244.918,387.419A80.01236,80.01236,0,0,0,368,320a80.76338,80.76338,0,0,0-1.17114-13.77344l21.05493,12.63379Z"/><path class="cls-6" d="M435.31372,75.31372,388.68628,28.68628A15.99933,15.99933,0,0,0,377.37256,24H376V64a16.00008,16.00008,0,0,0,16,16h46.54364A15.97424,15.97424,0,0,0,435.31372,75.31372Z"/><path class="cls-7" d="M431.682,80A192.06632,192.06632,0,0,1,248,216H439.99982V86.62744A15.97788,15.97788,0,0,0,438.54352,80Z"/><path class="cls-8" d="M216.00024,488.15479H456a32.00018,32.00018,0,0,0,32-32v-208A32.03988,32.03988,0,0,0,486.94781,240C474.868,379.05176,358.18512,488.15479,216.00024,488.15479Z"/><path class="cls-9" d="M416,152V136H403.93341a192.905,192.905,0,0,1-12.84454,16Z"/><path class="cls-9" d="M341.009,192H416V176H365.289A192.23423,192.23423,0,0,1,341.009,192Z"/><rect class="cls-10" height="32" rx="15.99998" width="256" x="160" y="424"/><polygon class="cls-4" points="316.686 456 339.314 456 371.314 424 348.686 424 316.686 456"/><polygon class="cls-4" points="268.686 456 291.314 456 323.314 424 300.686 424 268.686 456"/><polygon class="cls-4" points="220.686 456 243.314 456 275.314 424 252.686 424 220.686 456"/><path class="cls-4" d="M172.97992,455.70605A16.02754,16.02754,0,0,0,176,456h19.314l32-32H204.686Z"/><path class="cls-11" d="M399.91382,424H391.176A272.49156,272.49156,0,0,1,344,456h55.91382a16.00008,16.00008,0,0,0,16-16h0A16.00008,16.00008,0,0,0,399.91382,424Z"/></g></svg>`;

  return (
    <div dangerouslySetInnerHTML={{ __html: svgString }} />
  );
};

export default MySvgComponent;