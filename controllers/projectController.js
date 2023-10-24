import { StatusCodes } from 'http-status-codes';
import ProjectModel from '../models/ProjectModel.js';
import cloudinary from 'cloudinary';

export const getAllProjects = async (req, res) => {
  const projects = await ProjectModel.find();
  res.status(StatusCodes.OK).json({ projects });
};

export const createProject = async (req, res) => {
  const response = await cloudinary.v2.uploader.upload(
    req.body.imageFile.filepath,
    { folder: 'irene-castaneda' }
  );

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
  const project = await ProjectModel.findById(req.params.projectId);
  res.status(StatusCodes.OK).json(project);
};

export const deleteProject = async (req, res) => {
  const project = await ProjectModel.findById(req.params.projectId);
  await cloudinary.v2.uploader.destroy(project.cloudinaryId);

  const deletedProject = await ProjectModel.findByIdAndDelete(
    req.params.projectId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Project deleted', project: deletedProject });
};

export const updateProject = async (req, res) => {
  if (req.body.imageFile) {
    const oldProject = await ProjectModel.findById(req.params.projectId);
    await cloudinary.v2.uploader.destroy(oldProject.cloudinaryId);

    const response = await cloudinary.v2.uploader.upload(
      req.body.imageFile.filepath,
      { folder: 'irene-castaneda' }
    );
    req.body.cloudinaryUrl = response.url;
    req.body.cloudinaryId = response.public_id;
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'project updated', updatedProject });
};
