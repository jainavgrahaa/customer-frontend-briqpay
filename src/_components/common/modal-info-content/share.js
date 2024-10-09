/* eslint-disable @next/next/no-img-element */
import React, {useState , useEffect} from "react";
import { Button } from "@mui/material";
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
const Share = ({domain,storeTypes}) => {
  const router = useRouter();
  const [productUrl, setProductUrl] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = `${window.location.origin}${router.asPath}`;
      setProductUrl(currentUrl);
    }
  }, [router.asPath]);

  const encodedUrl = encodeURIComponent(productUrl);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
  const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000); // Reset the copied text message after 2 seconds
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };
  const [facebookSrc, setFacebookSrc] = useState("/assets/images/icons/share/df-facebook.png");
  const [instagramSrc, setInstagramSrc] = useState("/assets/images/icons/share/df-instagram.png");
  const [pinterestSrc, setPinterestSrc] = useState("/assets/images/icons/share/df-pintrest.png");
  const [shareSrc, setShareSrc] = useState("/assets/images/icons/share/df-share.png");
  return (
    <>
    {storeTypes[domain] === "ab" &&
    <>
    <div className="d-flex justify-content-center gap-2">
        <Tooltip title="Link"><Button variant="text" className="icon-rounded-lg icon-circle-bg-hover" onClick={copyToClipboard}><img src="/assets/images/icons/share/link.svg" alt="Link" width={"20"} height={"20"}/></Button></Tooltip>
        <Tooltip title="Whatsapp"><Button variant="text" className="icon-rounded-lg icon-circle-bg-hover" href={whatsappShareUrl} target="_blank"><img src="/assets/images/icons/share/whatsapp.svg" alt="whatsapp" width={"24"} height={"24"}/></Button></Tooltip>
        <Tooltip title="Email"><Button variant="text" className="icon-rounded-lg icon-circle-bg-hover" href="mailto:service@austenblake.com" target="_blank"><img src="/assets/images/icons/share/email.svg" alt="email" width={"27"} height={"27"}/></Button></Tooltip>
        <Tooltip title="Twitter"><Button variant="text" className="icon-rounded-lg icon-circle-bg-hover" href={twitterShareUrl} target="_blank"><img src="/assets/images/icons/share/twitter.svg" alt="twitter" width={"20"} height={"20"}/></Button></Tooltip>
        <Tooltip title="Facebook"><Button variant="text" className="icon-rounded-lg icon-circle-bg-hover" href={facebookShareUrl} target="_blank"><img src="/assets/images/icons/share/facebook.svg" alt="facebook" width={"24"} height={"24"}/></Button></Tooltip>
    </div>
    {copiedText && <p className="justify-content-center mt-3 mb-0 d-flex align-items-center"><span class="material-icons-outlined mr-10">link</span> Link Copied</p>}
     </>
    }
    {storeTypes[domain] === "df" &&
    <>
    <div className="d-flex justify-content-center gap-2 mt-3">
       <Tooltip title="Facebook">
        <Button
        variant="text"
        href={facebookShareUrl}
        target="_blank"
        className="icon-rounded-lg"
        onMouseEnter={() => setFacebookSrc("/assets/images/icons/share/df-facebook-hover.png")}
        onMouseLeave={() => setFacebookSrc("/assets/images/icons/share/df-facebook.png")}
      >
        <img src={facebookSrc} alt="facebook" width={"42"} height={"42"} />
      </Button>
      </Tooltip>
      <Tooltip title="Instagram">
      <Button
        variant="text"
        href={"https://www.instagram.com/diamondsfactoryworld/"}
        target="_blank"
        className="icon-rounded-lg"
        onMouseEnter={() => setInstagramSrc("/assets/images/icons/share/df-instagram-hover.png")}
        onMouseLeave={() => setInstagramSrc("/assets/images/icons/share/df-instagram.png")}
      >
        <img src={instagramSrc} alt="instagram" width={"42"} height={"42"} />
      </Button>
      </Tooltip>
      <Tooltip title="Pinterest">
      <Button
        variant="text"
        href={pinterestShareUrl}
        target="_blank"
        className="icon-rounded-lg"
        onMouseEnter={() => setPinterestSrc("/assets/images/icons/share/df-pintrest-hover.png")}
        onMouseLeave={() => setPinterestSrc("/assets/images/icons/share/df-pintrest.png")}
      >
        <img src={pinterestSrc} alt="pinterest" width={"42"} height={"42"} />
      </Button>
      </Tooltip>
      <Tooltip title="Link">
      <Button
        variant="text"
        onClick={copyToClipboard}
        className="icon-rounded-lg"
        onMouseEnter={() => setShareSrc("/assets/images/icons/share/df-share-hover.png")}
        onMouseLeave={() => setShareSrc("/assets/images/icons/share/df-share.png")}
      >
        <img src={shareSrc} alt="Link" width={"42"} height={"42"} />
      </Button>
      </Tooltip>
    </div>
    {copiedText && <p className="justify-content-center mt-3 mb-0 d-flex align-items-center"><span class="material-icons-outlined mr-10">link</span> Link Copied</p>}
    </>
    }
    </>
  );
};

export default Share;
