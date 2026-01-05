import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Renkei logo"
        width={26}
        height={26}
        priority
      />
      <span className="text-xl font-semibold tracking-tighter">
        Renkei
      </span>
    </div>
  );
}

export default Logo;
