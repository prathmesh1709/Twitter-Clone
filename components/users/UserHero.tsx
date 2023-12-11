import Image from "next/image";

import Avatar from "../Avatar";

interface UserHeroProps {
  fetchedUser: any;
}

export default function UserHero({ fetchedUser }: UserHeroProps) {
  return (
    <div className="bg-neutral-700 h-44 relative ">
      {fetchedUser?.coverImage && (
        <Image
          src={fetchedUser.coverImage}
          fill
          alt="cover image"
          style={{ objectFit: "cover" }}
        />
      )}
      <div className="absolute -bottom-16 left-4 flex justify-center items-center">
        <Avatar
          onProfilePage
          profileImage={fetchedUser.profileImage}
          isLarge
          hasBorder
        />
      </div>
    </div>
  );
}
