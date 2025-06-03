const MovieIframe = ({ url }: { url: string }) => {
  return (
    <iframe
      className="w-full h-full rounded-lg overflow-hidden"
      src={url}
      allowFullScreen
    />
  );
};

export default MovieIframe;
