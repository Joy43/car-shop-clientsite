declare module 'react-image-magnify' {
  import * as React from 'react';

  interface SmallImageType {
    alt: string;
    isFluidWidth: boolean;
    src: string;
  }

  interface LargeImageType {
    src: string;
    width: number;
    height: number;
  }

  interface ReactImageMagnifyProps {
    smallImage: SmallImageType;
    largeImage: LargeImageType;
    enlargedImageContainerStyle?: React.CSSProperties;
    isHintEnabled?: boolean;
    lensStyle?: React.CSSProperties;
  }

  const ReactImageMagnify: React.FC<ReactImageMagnifyProps>;
  export default ReactImageMagnify;
}
