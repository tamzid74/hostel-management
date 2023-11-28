import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { user } = useContext(AuthContext);

  const job = useLoaderData();
  const {
    companyLogo,
    jobBanner,
    jobTitle,
    jobDescription,
    salaryRange,
    jobApplicants,
    jobCategory,
    applicationDeadline,
  } = job;
  const [jobApplicant, setJobApplicant] = useState(job.jobApplicants);
  const handleApply = () => {
    const now = Date.now();

    if (new Date(applicationDeadline).getTime() < now) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Application deadline is over",
      });
    } else {
      document.getElementById("my_modal_1").showModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const email = form.email.value;
    const link = form.link.value;
    const appliedJob = {
      userName,
      email,
      link,
      companyLogo,
      jobBanner,
      jobTitle,
      jobDescription,
      salaryRange,
      jobApplicants,
      jobCategory,
      applicationDeadline,
    };
    console.log(appliedJob);

    fetch("https://b8-a11-jobify-server-side.vercel.app/appliedJobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appliedJob),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Submitted Successfully...");
          form.reset();
          setJobApplicant(parseInt(jobApplicants) + 1);
          fetch(
            "https://b8-a11-jobify-server-side.vercel.app/jobs/" + job._id,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                $inc: { jobApplicants: 1 },
              }),
            }
          )
            .then((response) => response.json())
            .then((updateData) => {
              if (updateData.modification === 1) {
                toast.success("Submitted Successfully......");
              }
            });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Jobify | JobDetails</title>
      </Helmet>
      <div className="w-full max-w-[1250px] px-[25px] mx-auto mt-20 mb-20 font-roboto">
        <div className="card bg-[#f5f7fc]">
          <figure>
            <img
              className="h-[60vh] w-full object-fill"
              src={jobBanner}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="flex items-center">
              <img className="mask mask-square w-16 " src={companyLogo} />
              <div className="ml-5 space-y-2">
                <h2 className=" text-lg md:card-title">
                  {jobTitle}
                  <div className="badge badge-primary">{jobCategory}</div>
                </h2>
                <div className="flex items-center gap-2">
                  <FaMoneyBillTransfer></FaMoneyBillTransfer>
                  <p className="text-xs md:text-base">{salaryRange}/month</p>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end flex items-center">
              <button
                className="btn text-xs md:text-base btn-primary rounded-full transition-transform duration-200 hover:scale-110 btn-sm"
                disabled={user?.email === job?.email}
                onClick={handleApply}
              >
                Apply
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-primary text-lg text-center">
                    Apply for the Job
                  </h3>
                  <p className="py-4 text-sm text-center">
                    Fill out the form below to apply for this job.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <label className="block text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.displayName}
                      name="userName"
                      disabled
                      className="input input-bordered input-sm w-full max-w-xs mb-2"
                    />
                    <label className="block text-sm mb-2">email</label>
                    <input
                      type="Email"
                      name="email"
                      value={user?.email}
                      className="input input-bordered input-sm w-full max-w-xs mb-2"
                      disabled
                    />
                    <label className="block text-sm mb-2">Resume Link</label>
                    <input
                      type="url"
                      name="link"
                      placeholder="resumeLink..."
                      className="input input-bordered input-sm w-full max-w-xs mb-2"
                      required
                    />
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-sm btn-primary block"
                    />
                  </form>
                </div>
              </dialog>
              <span className="text-xs md:text-base">
                Applicants: {jobApplicant}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-semibold">
            <span className="text-xl text-primary font-roboto">
              Job Description:{" "}
            </span>
            {jobDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
