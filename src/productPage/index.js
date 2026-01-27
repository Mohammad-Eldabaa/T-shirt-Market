import React, { useState, useMemo, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import ProductPageBottomBar from './productPageBottomBar';
import ProductPageHeader from './productPageHeader';
import ProductPreview from './productPreview';
import QuantityButtons from './quantityButtons';
import ColorSelector from './colorSelector';
import SizeSelector from './sizeSelector';

export default function ProductDetailPage({ bottomSheetRef, product }) {
  const snapPoints = useMemo(() => ['90%'], []);

  const [selectedColor, setSelectedColor] = useState('#000');
  const [selectedSize, setSelectedSize] = useState('L');

  const handleSheetChange = index => {
    if (index === -1) {
      setSelectedColor('#000');
      setSelectedSize('L');
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enableOverDrag={false}
      enablePanDownToClose={true}
      enableHandlePanningGesture={false}
      onChange={handleSheetChange}
      overScrollMode="never"
      backgroundStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
      }}
    >
      <ProductPageHeader bottomSheetRef={bottomSheetRef} />
      <ProductPreview product={product} />
      <ColorSelector
        selectedColor={selectedColor}
        onSelect={color => {
          setSelectedColor(color);
        }}
      />
      <SizeSelector
        selectedSize={selectedSize}
        onSelect={size => {
          setSelectedSize(size);
        }}
      />
      <QuantityButtons
        product={product}
        color={selectedColor}
        size={selectedSize}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
      <ProductPageBottomBar
        product={product}
        color={selectedColor}
        size={selectedSize}
      />
    </BottomSheet>
  );
}
