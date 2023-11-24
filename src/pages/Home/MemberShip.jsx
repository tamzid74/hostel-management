import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import SectionTitle from "../../components/SectionTitle";
import { AwesomeButtonProgress } from "react-awesome-button";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

const MemberShip = () => {
  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto">
      <SectionTitle
        heading={"Membership Plans"}
        subHeading={"Choose the plan that suits you best"}
      ></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 mb-10">
        {/* card-1 */}
        <Card
          color="gray"
          variant="gradient"
          className="w-full max-w-[20rem] p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Silver
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-2xl">$</span>29.99{" "}
              <span className="self-end text-2xl">/mo</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Access to exclusive member-only events
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Priority notification for upcoming hostel activities
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Basic meal package available for request
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 ml-6 p-0">
            <AwesomeButtonProgress
              type="primary"
              size="large"
              onPress={async (element, next) => {
                // await for something then call
                next();
              }}
            >
              Upgrade Now
            </AwesomeButtonProgress>
          </CardFooter>
        </Card>
        {/* card-2 */}
        <Card
          color="gray"
          variant="gradient"
          className="w-full max-w-[20rem] p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Gold
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-2xl">$</span>49.99{" "}
              <span className="self-end text-2xl">/mo</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  All Silver Membership benefits.
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Expedited check-in/check-out services.
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Enhanced room customization options.
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  EUpgraded meal package with diverse culinary choices.
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 ml-6 p-0 ">
            <AwesomeButtonProgress
              type="primary"
              size="large"
              onPress={async (element, next) => {
                // await for something then call
                next();
              }}
            >
              Upgrade Now
            </AwesomeButtonProgress>
          </CardFooter>
        </Card>
        {/* card-3 */}
        <Card
          color="gray"
          variant="gradient"
          className="w-full max-w-[20rem] p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Platinum
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-2xl">$</span>79.99{" "}
              <span className="self-end text-2xl">/mo</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  All Gold Membership benefits.
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  VIP access to premium hostel amenities.
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Complimentary room upgrades (subject to availability).
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Gourmet meal package with personalized chef&apos;s selections.
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 ml-6 p-0">
            <AwesomeButtonProgress
              type="primary"
              size="large"
              onPress={async (element, next) => {
                // await for something then call
                next();
              }}
            >
              Upgrade Now
            </AwesomeButtonProgress>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MemberShip;
