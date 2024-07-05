import { User } from "@/types/user";
import { fullName } from "@utils/functions";


function descendingComparator(a: {
  [x: string]: User;
}, b: {
  [x: string]: User;
}, orderBy: string) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: { [x: string]: any; }, b: { [x: string]: any; }) => descendingComparator(a, b, orderBy)
    : (a: { [x: string]: any; }, b: { [x: string]: any; }) => -descendingComparator(a, b, orderBy);
}


interface ApplyFilterProps {
  inputData: User[];
  comparator: (a: {
    [x: string]: User;
  }, b: {
    [x: string]: User;
  }) => number;
  filterName: string;
}
export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis: [User, number][] = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator((a as any)[0], (b as any)[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => fullName(user).toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}


export const validateEmail = (value: string | null | undefined): string | null => {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return "Please enter a valid email address";
  }

  return null;
};

export const validatePassword = (value: string, required = true): string | null => {
  if (!value && required) {
    return "Password is required";
  }

  if (value.length < 6 && value.length > 0) {
    return "Password is too short";
  }

  return null;
};



export const validateAvatarUrl = (avatar: string) => {
  if (!avatar) return null;
  if (!avatar.startsWith("https://")) {
    return "Avatar must be a valid URL";
  }
  return null;
};
