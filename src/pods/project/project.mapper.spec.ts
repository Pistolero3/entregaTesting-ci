import * as apiModel from './api/project.api-model';
import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';

describe('Project Mapper', () => {
  it('should create an empty project when getting undefined', () => {
    //Arrange
    const project: apiModel.Project = undefined;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should create an empty project when getting null', () => {
    //Arrange
    const project: apiModel.Project = null;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should create a project when getting a valid project', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'Project 1',
      externalId: '1',
      comments: '',
      isActive: true,
      employees: [],
    };
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual({
      id: '1',
      name: 'Project 1',
      externalId: '1',
      comments: '',
      isActive: true,
      employees: [],
    });
  });
});
