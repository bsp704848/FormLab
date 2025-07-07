export default function HeaderField({ text, level = 2,style }) {
  const Tag = `h${level}`;
  return <Tag className="font-bold text-xl sm:text-2xl mb-2 text-center p-3" style={style}>{text}</Tag>;
}
