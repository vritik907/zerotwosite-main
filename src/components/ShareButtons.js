import React from 'react';

const ShareButtons = ({ url, title }) => {
  const openPopupWindow = (url) => {
    const width = 550;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      url,
      '',
      `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    openPopupWindow(facebookShareUrl);
  };

  const handleWhatsappShare = () => {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    openPopupWindow(whatsappShareUrl);
  };

  const handleTelegramShare = () => {
    const telegramShareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    openPopupWindow(telegramShareUrl);
  };

  const handleLinkedinShare = () => {
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    openPopupWindow(linkedinShareUrl);
  };

  const handleInstagramShare = () => {
    const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
    openPopupWindow(instagramShareUrl);
  };

  return (
    <div>
      <button onClick={handleFacebookShare}>Share on Facebook</button>
      <button onClick={handleWhatsappShare}>Share on WhatsApp</button>
      <button onClick={handleTelegramShare}>Share on Telegram</button>
      <button onClick={handleLinkedinShare}>Share on LinkedIn</button>
      <button onClick={handleInstagramShare}>Share on Instagram</button>
    </div>
  );
};

export default ShareButtons;
