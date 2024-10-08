import { FC } from "react";

interface OpenImageProps {
  selectedImage: string;
  handleChangeImage: (move?: "left" | "right") => void;
}

const OpenImage: FC<OpenImageProps> = ({ handleChangeImage, selectedImage }) => {
  return (
    <div className="fixed h-full w-full bg-black/50 top-0 left-0 flex items-center justify-center">
      <div className="flex items-center justify-between gap-3 w-3/4">
        <button onClick={() => handleChangeImage("left")} className="hover:brightness-75">
          <svg width="11px" height="20px" viewBox="0 0 11 20" className="h-28 w-12">
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Rounded" transform="translate(-548.000000, -3434.000000)">
                <g id="Navigation" transform="translate(100.000000, 3378.000000)">
                  <g
                    id="-Round-/-Navigation-/-arrow_back_ios"
                    transform="translate(442.000000, 54.000000)"
                  >
                    <g>
                      <polygon id="Path" opacity="0.87" points="0 0 24 0 24 24 0 24"></polygon>
                      <path
                        d="M16.62,2.99 C16.13,2.5 15.34,2.5 14.85,2.99 L6.54,11.3 C6.15,11.69 6.15,12.32 6.54,12.71 L14.85,21.02 C15.34,21.51 16.13,21.51 16.62,21.02 C17.11,20.53 17.11,19.74 16.62,19.25 L9.38,12 L16.63,4.75 C17.11,4.27 17.11,3.47 16.62,2.99 Z"
                        id="🔹-Icon-Color"
                        fill="#1D1D1D"
                        className="fill-slate-200"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={selectedImage} alt="openImage" className="w-3/4" />
        <button onClick={() => handleChangeImage("right")} className="hover:brightness-75">
          <svg width="11px" height="20px" viewBox="0 0 11 20" className="h-28 w-12">
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Rounded" transform="translate(-345.000000, -3434.000000)">
                <g id="Navigation" transform="translate(100.000000, 3378.000000)">
                  <g
                    id="-Round-/-Navigation-/-arrow_forward_ios"
                    transform="translate(238.000000, 54.000000)"
                  >
                    <g>
                      <polygon id="Path" opacity="0.87" points="24 24 0 24 0 0 24 0"></polygon>
                      <path
                        d="M7.38,21.01 C7.87,21.5 8.66,21.5 9.15,21.01 L17.46,12.7 C17.85,12.31 17.85,11.68 17.46,11.29 L9.15,2.98 C8.66,2.49 7.87,2.49 7.38,2.98 C6.89,3.47 6.89,4.26 7.38,4.75 L14.62,12 L7.37,19.25 C6.89,19.73 6.89,20.53 7.38,21.01 Z"
                        id="🔹-Icon-Color"
                        fill="#1D1D1D"
                        className="fill-slate-200"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button
          onClick={() => handleChangeImage()}
          className="absolute bottom-10 -translate-x-2/4 left-2/4 px-4 py-3 border border-slate-100 text-white opacity-60 hover:opacity-100"
        >
          Закрити
        </button>
      </div>
    </div>
  );
};

export default OpenImage;
