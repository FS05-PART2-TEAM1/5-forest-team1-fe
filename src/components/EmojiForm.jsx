import EmojiTag from "@/common/EmojiTag";

function EmojiForm () {

  return (
    <div className="flex gap-2">
      <EmojiTag emoji={"😀"} count={33}/>
      <EmojiTag emoji={"😍"} count={22}/>
      <EmojiTag emoji={"🤪"} count={11}/>
    </div>
  );
}

export default EmojiForm;