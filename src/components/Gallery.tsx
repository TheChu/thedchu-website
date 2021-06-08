import React, { Component, MouseEvent, ReactElement } from 'react';
import Lightbox from 'react-images';

interface GalleryProps {
  images: {
    caption?: string;
    desc: string;
    src: string;
    thumbnail: string;
    title: string;
  }[];
}

interface GalleryState {
  currentImage: number;
  lightboxIsOpen: boolean;
}

class Gallery extends Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);

    this.state = {
      currentImage: 0,
      lightboxIsOpen: false,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  handleClickImage(): void {
    const { currentImage } = this.state;
    const { images } = this.props;
    if (currentImage === images.length - 1) return;

    this.gotoNext();
  }

  openLightbox(index: number, event: MouseEvent): void {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox(): void {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious(): void {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage - 1,
    });
  }

  gotoNext(): void {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage + 1,
    });
  }

  gotoImage(index: number): void {
    this.setState({
      currentImage: index,
    });
  }

  renderGallery(): ReactElement {
    const { images } = this.props;

    const gallery = images.map((obj, i) => (
      <div key={obj.src} className="col-lg-4 col-sm-6">
        <a
          onClick={(e) => this.openLightbox(i, e)}
          className="portfolio-box"
          href={obj.src}
        >
          <img
            className="img-fluid"
            src={obj.thumbnail}
            alt={obj.desc}
            title={obj.title}
          />
          <div className="portfolio-box-caption">
            <div className="project-category text-white-50">{obj.title}</div>
            <div className="project-name">{obj.desc}</div>
          </div>
        </a>
      </div>
    ));

    return (
      <div className="container-fluid p-0">
        <div className="row no-gutters">{gallery}</div>
      </div>
    );
  }

  render(): ReactElement {
    const { currentImage, lightboxIsOpen } = this.state;
    const { images } = this.props;
    return (
      <>
        {images ? this.renderGallery() : null}
        <Lightbox
          currentImage={currentImage}
          images={images.map((img) => {
            img.caption = `${img.title} - ${img.desc}`; // eslint-disable-line no-param-reassign
            return img;
          })}
          isOpen={lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
        />
      </>
    );
  }
}

export default Gallery;
