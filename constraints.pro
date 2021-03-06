gen_enforced_field(WorkspaceCwd, 'homepage', 'https://github.com/BunchoDev/buncho').
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'git@github.com:BunchoDev/buncho.git').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :-
  WorkspaceCwd \= '.'.
gen_enforced_field(WorkspaceCwd, 'license', 'MIT').

gen_enforced_field(WorkspaceCwd, 'scripts.build', 'run --top-level lib build') :-
  WorkspaceCwd \= '.'.
gen_enforced_field(WorkspaceCwd, 'scripts.clean', 'run --top-level lib clean') :-
  WorkspaceCwd \= '.'.
gen_enforced_field(WorkspaceCwd, 'scripts.prepack', 'run clean && run build && cp ../../../LICENSE .') :-
  WorkspaceCwd \= '.'.

gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(_, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyType \= 'peerDependencies',
  DependencyType2 \= 'peerDependencies'.
