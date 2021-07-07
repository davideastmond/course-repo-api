import { IUser } from "../user/user.types";

export interface IGoogleData {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: Array<{ value: string; verified: boolean }>;
  photos: Array<{ value: string }>;
  provider: string;
  accessToken: string;
}

export interface IAdaptedUser extends Partial<IUser> {}
export const getUserFromGoogleData = (profile: IGoogleData): IAdaptedUser => {
  return {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    auth: {
      googleId: profile.id,
      email: profile.emails[0].value.toLowerCase(),
      accessToken: profile.accessToken,
    },
    avatar: profile.photos.map((photo) => {
      return { url: photo.value };
    }),
    courses: [],
  };
};
