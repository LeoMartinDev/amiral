import { invoke } from '@tauri-apps/api/tauri';

export default async function getInfo() {
  const infoResponse: any = await invoke('get_info');

  return infoResponse;
}

// {
//   "Architecture":"x86_64",
//   "BridgeNfIp6tables":true,
//   "BridgeNfIptables":true,
//   "CPUSet":true,
//   "CPUShares":true,
//   "CgroupDriver":"cgroupfs",
//   "CgroupVersion":"1",
//   "ContainerdCommit":{
//      "Expected":"212e8b6fa2f44b9c21b2798135fc6fb7c53efc16",
//      "ID":"212e8b6fa2f44b9c21b2798135fc6fb7c53efc16"
//   },
//   "Containers":20,
//   "ContainersPaused":0,
//   "ContainersRunning":2,
//   "ContainersStopped":18,
//   "CpuCfsPeriod":true,
//   "CpuCfsQuota":true,
//   "Debug":false,
//   "DefaultRuntime":"runc",
//   "DockerRootDir":"/var/lib/docker",
//   "Driver":"overlay2",
//   "DriverStatus":[
//      [
//         "Backing Filesystem",
//         "extfs"
//      ],
//      [
//         "Supports d_type",
//         "true"
//      ],
//      [
//         "Native Overlay Diff",
//         "true"
//      ],
//      [
//         "userxattr",
//         "false"
//      ]
//   ],
//   "ExperimentalBuild":false,
//   "HttpProxy":"http.docker.internal:3128",
//   "HttpsProxy":"http.docker.internal:3128",
//   "ID":"5AVM:HKBL:BUHO:IKW4:U5FK:C6MV:DSB2:YM2T:BQSZ:CLXT:57GE:CTCB",
//   "IPv4Forwarding":true,
//   "Images":187,
//   "IndexServerAddress":"https://index.docker.io/v1/",
//   "InitBinary":"docker-init",
//   "InitCommit":{
//      "Expected":"de40ad0",
//      "ID":"de40ad0"
//   },
//   "Isolation":"",
//   "KernelMemory":true,
//   "KernelMemoryTCP":true,
//   "KernelVersion":"5.10.102.1-microsoft-standard-WSL2",
//   "Labels":[

//   ],
//   "LiveRestoreEnabled":false,
//   "LoggingDriver":"json-file",
//   "MemTotal":12548612096,
//   "MemoryLimit":true,
//   "NCPU":16,
//   "NEventsListener":6,
//   "NFd":65,
//   "NGoroutines":64,
//   "Name":"docker-desktop",
//   "NoProxy":"hubproxy.docker.internal",
//   "OSType":"linux",
//   "OSVersion":"",
//   "OomKillDisable":true,
//   "OperatingSystem":"Docker Desktop",
//   "PidsLimit":true,
//   "Plugins":{
//      "Log":[
//         "awslogs",
//         "fluentd",
//         "gcplogs",
//         "gelf",
//         "journald",
//         "json-file",
//         "local",
//         "logentries",
//         "splunk",
//         "syslog"
//      ],
//      "Network":[
//         "bridge",
//         "host",
//         "ipvlan",
//         "macvlan",
//         "null",
//         "overlay"
//      ],
//      "Volume":[
//         "local"
//      ]
//   },
//   "RegistryConfig":{
//      "AllowNondistributableArtifactsCIDRs":[

//      ],
//      "AllowNondistributableArtifactsHostnames":[

//      ],
//      "IndexConfigs":{
//         "docker.io":{
//            "Mirrors":[

//            ],
//            "Name":"docker.io",
//            "Official":true,
//            "Secure":true
//         },
//         "hubproxy.docker.internal:5000":{
//            "Mirrors":[

//            ],
//            "Name":"hubproxy.docker.internal:5000",
//            "Official":false,
//            "Secure":false
//         }
//      },
//      "InsecureRegistryCIDRs":[
//         "127.0.0.0/8"
//      ],
//      "Mirrors":[

//      ]
//   },
//   "RuncCommit":{
//      "Expected":"v1.1.1-0-g52de29d",
//      "ID":"v1.1.1-0-g52de29d"
//   },
//   "Runtimes":{
//      "io.containerd.runc.v2":{
//         "path":"runc"
//      },
//      "io.containerd.runtime.v1.linux":{
//         "path":"runc"
//      },
//      "runc":{
//         "path":"runc"
//      }
//   },
//   "SecurityOptions":[
//      "name=seccomp,profile=default"
//   ],
//   "ServerVersion":"20.10.16",
//   "SwapLimit":true,
//   "Swarm":{
//      "ControlAvailable":false,
//      "Error":"",
//      "LocalNodeState":"inactive",
//      "NodeAddr":"",
//      "NodeID":""
//   },
//   "SystemTime":"2022-06-15T18:55:36.4662936Z",
//   "Warnings":[
//      "WARNING: No blkio throttle.read_bps_device support",
//      "WARNING: No blkio throttle.write_bps_device support",
//      "WARNING: No blkio throttle.read_iops_device support",
//      "WARNING: No blkio throttle.write_iops_device support"
//   ]
// }
