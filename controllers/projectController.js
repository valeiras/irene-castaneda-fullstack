import { StatusCodes } from 'http-status-codes';
import ProjectModel from '../models/ProjectModel.js';
import cloudinary from 'cloudinary';

export const getAllProjects = async (req, res) => {
  console.log('Get all projects!!');
  const projects = await ProjectModel.find();
  res.status(StatusCodes.OK).json({ projects });
};

export const createProject = async (req, res) => {
  const response = await cloudinary.v2.uploader.upload(
    req.body.imageFile.filepath,
    { folder: 'irene-castaneda' }
  );
  console.log(response);

  const newProjectData = {
    ...req.body,
    cloudinaryUrl: response.url,
    cloudinaryId: response.public_id,
  };
  delete newProjectData.imageFile;
  const newProject = await ProjectModel.create(newProjectData);

  res.status(StatusCodes.CREATED).json({ msg: 'project created', newProject });
};

export const getProject = async (req, res) => {
  console.log('Get single project!!');
  const project = await ProjectModel.findById(req.params.id);
  res.status(StatusCodes.OK).json(project);
};

export const deleteProject = async (req, res) => {
  // const project = await ProjectModel.findById(req.params.projectId);
  // const imagekit = new ImageKit({
  //   urlEndpoint: process.env.IMAGEKIT_URL,
  //   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  // });
  // await imagekit.deleteFile(project.imagekitId).then(() => {});
  // const deletedProject = await ProjectModel.findByIdAndDelete(
  //   req.params.projectId
  // );
  // res
  //   .status(StatusCodes.OK)
  //   .json({ msg: 'Project deleted', project: deletedProject });
};

export const updateProject = async (req, res) => {
  req.body.friendlyUrlName = getFriendlyUrl(req.body.name);
  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'project updated', updatedProject });
};
