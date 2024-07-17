import { PeopleListProps } from "@/types/apartment";
import { useState } from "react";

const PeopleList = ({ people }: PeopleListProps) => {
  const [open, setOpen] = useState<"update" | "change-p" | null>(null);
  return (
    <></>
    // <CustomTable
    //   head={
    //     <Stack
    //       direction="row"
    //       alignItems="center"
    //       justifyContent="space-between"
    //       mb={5}
    //     >
    //       <Typography variant="h4">People</Typography>
    //       <Stack
    //         direction="row"
    //         alignItems="center"
    //         justifyContent="space-between"
    //         gap={2}
    //       >
    //         <Button
    //           onClick={() => setOpen("change-p")}
    //           variant="outlined"
    //           color="inherit"
    //           startIcon={<Iconify icon="eva:person-fill" />}
    //         >
    //           Change Primary Person
    //         </Button>
    //         <AppModal
    //           handleClose={() => setOpen(null)}
    //           open={open === "change-p"}
    //         >
    //           <form action="">
    //             <Stack
    //               direction="column"
    //               alignItems="center"
    //               justifyContent="center"
    //               spacing={2}
    //             >
    //               <Select native defaultValue="Select Person" fullWidth>
    //                 <option value="Select Person" disabled>
    //                   Select Person
    //                 </option>
    //                 {people.map((person) => (
    //                   <option key={person.id} value={person.id}>
    //                     {person.name}
    //                   </option>
    //                 ))}
    //               </Select>
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 fullWidth
    //                 type="submit"
    //               >
    //                 Change Primary Person
    //               </Button>
    //             </Stack>
    //           </form>
    //         </AppModal>
    //         <Button
    //           variant="contained"
    //           color="inherit"
    //           startIcon={<Iconify icon="eva:plus-fill" />}
    //           onClick={() => setOpen("update")}
    //         >
    //           New Person
    //         </Button>
    //         <AppModal
    //           handleClose={() => setOpen(null)}
    //           open={open === "update"}
    //         >
    //           <PeopleForm handleClose={() => setOpen(null)} />
    //         </AppModal>
    //       </Stack>
    //     </Stack>
    //   }
    //   Cells={PeopleCell}
    //   data={people}
    //   headLabel={[
    //     { id: "name", label: "Name" },
    //     { id: "primary", label: "Primary" },
    //   ]}
    //   searchPlaceholder="Search People"
    //   error={null}
    //   loading={false}
    //   page={0}
    //   setPage={() => {}}
    //   title="Peoples"
    // />
  );
};

export default PeopleList;
