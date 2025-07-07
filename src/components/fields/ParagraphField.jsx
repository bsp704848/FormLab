export default function ParagraphField({ text,style,content }) {
  return <p className="mb-4 text-sm sm:text-base max-w-md mx-auto" style={style}>{text || content}</p>;
}
