"use client";

import { KqsProfile } from "@prisma/client";
import Link from "next/link";
import { FC, FormEventHandler, useState } from "react";
import { IoIosSettings } from "react-icons/io";

import SelectOption from "@/components/ui/core/select/SelectOption";
import { citiesList, elementsList } from "@/shared/constants";

import { updateProfileInfo } from "../services";
import Avatar from "./Avatar";
import Card from "./Card";

interface UserCardProps {
  profile: KqsProfile;
}

const UserCard: FC<UserCardProps> = ({ profile }) => {
  const [edit, setEdit] = useState(false);

  const handleChangeEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("username"));
    const elemental = String(formData.get("elemental"));
    const city = String(formData.get("city"));

    try {
      await updateProfileInfo({ city, elemental, name });
    } catch (error) {}

    handleChangeEdit();
  };

  return (
    <Card
      profile={profile}
      avatarComponent={
        <Avatar photo={profile.avatar} name={profile.name}>
          <Link href="/user/profile/avatar" />
        </Avatar>
      }
    >
      <button type="button" className="absolute left-4 bottom-4 group" onClick={handleChangeEdit}>
        <IoIosSettings
          size={30}
          className="text-gray-700 group-hover:text-gray-800 group-hover:rotate-90 transition"
        />
      </button>
      {edit ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 rounded-lg p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Нове ім'я"
              className="rounded p-1 w-full outline-purple-400"
            />
            <SelectOption id="city" name="Нове місто" options={citiesList} />
            <SelectOption id="elemental" name="Новий елемент" options={elementsList} />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-400 transition flex-1 p-2 rounded"
              >
                Зберегти
              </button>
              <button
                type="reset"
                onClick={handleChangeEdit}
                className="bg-red-500 text-white hover:bg-red-400 transition p-2 rounded"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </Card>
  );
};

export default UserCard;
