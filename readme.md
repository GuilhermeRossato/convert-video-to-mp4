# Convert Video to MP4

A simple Nodejs library to convert videos to mp4 (MPEG4 format) from common video files like .avi, .mpg, .mkv.

Only works on the backend on Nodejs context because of an external dependency (FFmpeg). To convert on the frontend you must first send the video to the backend, save it on a file, execute the library and send it back to the user when done.

Most videos formats are supported but if you want to check they must be included in the demuxer list on your installation of FFmpeg, which is the executable used to convert the videos. Simple open your terminal (cmd or bash) and type in `ffmpeg -demuxers` and it will give you the list of supported video formats.

## Dependencies

1. You need to use Windows (Linux version is coming)

2. You need to install [ffmpeg](https://ffmpeg.org) manually

3. You need to have the video in the file system

## Usage

First, install with npm

```
npm i convert-video-to-mp4
```

You can now run it as a nodejs module:

```js
const converter = require("convert-video-to-mp4");
converter.convertVideoFileToMp4("./file.avi");
```

This will take a few seconds depending on the size of the `file.avi` file, but will eventually parse the video file and output a new file on the same folder with the name `file.mp4`.

The function only returns if it was successful, otherwise it just throws an error with a very descriptive error message.

Although almost every video format is supported, some exceptions like raw formats or novel video types might not work with the video converter because the program cannot "demux" (interpret) the video. Check the [demux list](https://ffmpeg.org/ffmpeg-formats.html#Demuxers) to see if something is incompatible. Sometimes you just need to install an additional library ontop of ffmpeg to make it work.

## How it works internally

This is basically a wrapper on FFmpeg, a free and open-source program with a variety of video editing capabilities.

This library uses `child_process` to `spawnSync` an ffmpeg command with the right arguments to process the video into the output format at decent quality.

## Testing

You can run automated tests with:

```
npm run test
```

If everything went right you should see:

```
> convert-video-to-mp4@1.0.0 test https://github.com/GuilhermeRossato/convert-video-to-mp4
> node ./test/index.js

Test 1: Success - convert-avi-to-mp4.js
Test 2: Success - convert-mkv-to-mp4.js
Test 3: Success - fails-predictably-when-missing-file.js

Executed 3 tests:
        3 successful tests
        0 failed tests
```

## Supported Video Files

FFmpeg is under active development and each version comes with different video reading capabilities, here's a list I got from my installation by running `ffmpeg -demuxers`

```
ffmpeg version n4.4-188-g404c9331dd-20211023 Copyright (c) 2000-2021 the FFmpeg developers
  built with gcc 10-win32 (GCC) 20210408
 
 File formats with demuxing support:
 --
 3dostr          3DO STR
4xm             4X Technologies
aa              Audible AA format files
aac             raw ADTS AAC (Advanced Audio Coding)
aax             CRI AAX
ac3             raw AC-3
ace             tri-Ace Audio Container
acm             Interplay ACM
act             ACT Voice file format
adf             Artworx Data Format
adp             ADP
ads             Sony PS2 ADS
adx             CRI ADX
aea             MD STUDIO audio
afc             AFC
aiff            Audio IFF
aix             CRI AIX
alaw            PCM A-law
alias_pix       Alias/Wavefront PIX image
alp             LEGO Racers ALP
amr             3GPP AMR
amrnb           raw AMR-NB
amrwb           raw AMR-WB
anm             Deluxe Paint Animation
apc             CRYO APC
ape             Monkey's Audio
apm             Ubisoft Rayman 2 APM
apng            Animated Portable Network Graphics
aptx            raw aptX
aptx_hd         raw aptX HD
aqtitle         AQTitle subtitles
argo_asf        Argonaut Games ASF
argo_brp        Argonaut Games BRP
asf             ASF (Advanced / Active Streaming Format)
asf_o           ASF (Advanced / Active Streaming Format)
ass             SSA (SubStation Alpha) subtitle
ast             AST (Audio Stream)
au              Sun AU
av1             AV1 Annex B
avi             AVI (Audio Video Interleaved)
avisynth        AviSynth script
avr             AVR (Audio Visual Research)
avs             Argonaut Games Creature Shock
avs2            raw AVS2-P2/IEEE1857.4
avs3            raw AVS3-P2/IEEE1857.10
bethsoftvid     Bethesda Softworks VID
bfi             Brute Force & Ignorance
bfstm           BFSTM (Binary Cafe Stream)
bin             Binary text
bink            Bink
binka           Bink Audio
bit             G.729 BIT file format
bmp_pipe        piped bmp sequence
bmv             Discworld II BMV
boa             Black Ops Audio
brender_pix     BRender PIX image
brstm           BRSTM (Binary Revolution Stream)
c93             Interplay C93
caf             Apple CAF (Core Audio Format)
cavsvideo       raw Chinese AVS (Audio Video Standard)
cdg             CD Graphics
cdxl            Commodore CDXL video
cine            Phantom Cine
codec2          codec2 .c2 demuxer
codec2raw       raw codec2 demuxer
concat          Virtual concatenation script
cri_pipe        piped cri sequence
dash            Dynamic Adaptive Streaming over HTTP
data            raw data
daud            D-Cinema audio
dcstr           Sega DC STR
dds_pipe        piped dds sequence
derf            Xilam DERF
dfa             Chronomaster DFA
dhav            Video DAV
dirac           raw Dirac
dnxhd           raw DNxHD (SMPTE VC-3)
dpx_pipe        piped dpx sequence
dsf             DSD Stream File (DSF)
dshow           DirectShow capture
dsicin          Delphine Software International CIN
dss             Digital Speech Standard (DSS)
dts             raw DTS
dtshd           raw DTS-HD
dv              DV (Digital Video)
dvbsub          raw dvbsub
dvbtxt          dvbtxt
dxa             DXA
ea              Electronic Arts Multimedia
ea_cdata        Electronic Arts cdata
eac3            raw E-AC-3
epaf            Ensoniq Paris Audio File
exr_pipe        piped exr sequence
f32be           PCM 32-bit floating-point big-endian
f32le           PCM 32-bit floating-point little-endian
f64be           PCM 64-bit floating-point big-endian
f64le           PCM 64-bit floating-point little-endian
ffmetadata      FFmpeg metadata in text
film_cpk        Sega FILM / CPK
filmstrip       Adobe Filmstrip
fits            Flexible Image Transport System
flac            raw FLAC
flic            FLI/FLC/FLX animation
flv             FLV (Flash Video)
frm             Megalux Frame
fsb             FMOD Sample Bank
fwse            Capcom's MT Framework sound
g722            raw G.722
g723_1          G.723.1
g726            raw big-endian G.726 ("left aligned")
g726le          raw little-endian G.726 ("right aligned")
g729            G.729 raw format demuxer
gdigrab         GDI API Windows frame grabber
gdv             Gremlin Digital Video
genh            GENeric Header
gif             CompuServe Graphics Interchange Format (GIF)
gif_pipe        piped gif sequence
gsm             raw GSM
gxf             GXF (General eXchange Format)
h261            raw H.261
h263            raw H.263
h264            raw H.264 video
hca             CRI HCA
hcom            Macintosh HCOM
hevc            raw HEVC video
hls             Apple HTTP Live Streaming
hnm             Cryo HNM v4
ico             Microsoft Windows ICO
idcin           id Cinematic
idf             iCE Draw File
iff             IFF (Interchange File Format)
ifv             IFV CCTV DVR
ilbc            iLBC storage
image2          image2 sequence
image2pipe      piped image2 sequence
ingenient       raw Ingenient MJPEG
ipmovie         Interplay MVE
ipu             raw IPU Video
ircam           Berkeley/IRCAM/CARL Sound Format
iss             Funcom ISS
iv8             IndigoVision 8000 video
ivf             On2 IVF
ivr             IVR (Internet Video Recording)
j2k_pipe        piped j2k sequence
jacosub         JACOsub subtitle format
jpeg_pipe       piped jpeg sequence
jpegls_pipe     piped jpegls sequence
jv              Bitmap Brothers JV
kux             KUX (YouKu)
kvag            Simon & Schuster Interactive VAG
lavfi           Libavfilter virtual input device
libgme          Game Music Emu demuxer
live_flv        live RTMP FLV (Flash Video)
lmlm4           raw lmlm4
loas            LOAS AudioSyncStream
lrc             LRC lyrics
luodat          Video CCTV DAT
lvf             LVF
lxf             VR native stream (LXF)
m4v             raw MPEG-4 video
matroska,webm   Matroska / WebM
mca             MCA Audio Format
mcc             MacCaption
mgsts           Metal Gear Solid: The Twin Snakes
microdvd        MicroDVD subtitle format
mjpeg           raw MJPEG video
mjpeg_2000      raw MJPEG 2000 video
mlp             raw MLP
mlv             Magic Lantern Video (MLV)
mm              American Laser Games MM
mmf             Yamaha SMAF
mods            MobiClip MODS
moflex          MobiClip MOFLEX
mov,mp4,m4a,3gp,3g2,mj2 QuickTime / MOV
mp3             MP2/3 (MPEG audio layer 2/3)
mpc             Musepack
mpc8            Musepack SV8
mpeg            MPEG-PS (MPEG-2 Program Stream)
mpegts          MPEG-TS (MPEG-2 Transport Stream)
mpegtsraw       raw MPEG-TS (MPEG-2 Transport Stream)
mpegvideo       raw MPEG video
mpjpeg          MIME multipart JPEG
mpl2            MPL2 subtitles
mpsub           MPlayer subtitles
msf             Sony PS3 MSF
msnwctcp        MSN TCP Webcam stream
msp             Microsoft Paint (MSP))
mtaf            Konami PS2 MTAF
mtv             MTV
mulaw           PCM mu-law
musx            Eurocom MUSX
mv              Silicon Graphics Movie
mvi             Motion Pixels MVI
mxf             MXF (Material eXchange Format)
mxg             MxPEG clip
nc              NC camera feed
nistsphere      NIST SPeech HEader REsources
nsp             Computerized Speech Lab NSP
nsv             Nullsoft Streaming Video
nut             NUT
nuv             NuppelVideo
obu             AV1 low overhead OBU
ogg             Ogg
oma             Sony OpenMG audio
paf             Amazing Studio Packed Animation File
pam_pipe        piped pam sequence
pbm_pipe        piped pbm sequence
pcx_pipe        piped pcx sequence
pgm_pipe        piped pgm sequence
pgmyuv_pipe     piped pgmyuv sequence
pgx_pipe        piped pgx sequence
photocd_pipe    piped photocd sequence
pictor_pipe     piped pictor sequence
pjs             PJS (Phoenix Japanimation Society) subtitles
pmp             Playstation Portable PMP
png_pipe        piped png sequence
pp_bnk          Pro Pinball Series Soundbank
ppm_pipe        piped ppm sequence
psd_pipe        piped psd sequence
psxstr          Sony Playstation STR
pva             TechnoTrend PVA
pvf             PVF (Portable Voice Format)
qcp             QCP
qdraw_pipe      piped qdraw sequence
r3d             REDCODE R3D
rawvideo        raw video
realtext        RealText subtitle format
redspark        RedSpark
rl2             RL2
rm              RealMedia
roq             id RoQ
rpl             RPL / ARMovie
rsd             GameCube RSD
rso             Lego Mindstorms RSO
rtp             RTP input
rtsp            RTSP input
s16be           PCM signed 16-bit big-endian
s16le           PCM signed 16-bit little-endian
s24be           PCM signed 24-bit big-endian
s24le           PCM signed 24-bit little-endian
s32be           PCM signed 32-bit big-endian
s32le           PCM signed 32-bit little-endian
s337m           SMPTE 337M
s8              PCM signed 8-bit
sami            SAMI subtitle format
sap             SAP input
sbc             raw SBC (low-complexity subband codec)
sbg             SBaGen binaural beats script
scc             Scenarist Closed Captions
sdp             SDP
sdr2            SDR2
sds             MIDI Sample Dump Standard
sdx             Sample Dump eXchange
ser             SER (Simple uncompressed video format for astronomical capturing)
sga             Digital Pictures SGA
sgi_pipe        piped sgi sequence
shn             raw Shorten
siff            Beam Software SIFF
simbiosis_imx   Simbiosis Interactive IMX
sln             Asterisk raw pcm
smjpeg          Loki SDL MJPEG
smk             Smacker
smush           LucasArts Smush
sol             Sierra SOL
sox             SoX native
spdif           IEC 61937 (compressed data in S/PDIF)
srt             SubRip subtitle
stl             Spruce subtitle format
subviewer       SubViewer subtitle format
subviewer1      SubViewer v1 subtitle format
sunrast_pipe    piped sunrast sequence
sup             raw HDMV Presentation Graphic Stream subtitles
svag            Konami PS2 SVAG
svg_pipe        piped svg sequence
svs             Square SVS
swf             SWF (ShockWave Flash)
tak             raw TAK
tedcaptions     TED Talks captions
thp             THP
tiertexseq      Tiertex Limited SEQ
tiff_pipe       piped tiff sequence
tmv             8088flex TMV
truehd          raw TrueHD
tta             TTA (True Audio)
tty             Tele-typewriter
txd             Renderware TeXture Dictionary
ty              TiVo TY Stream
u16be           PCM unsigned 16-bit big-endian
u16le           PCM unsigned 16-bit little-endian
u24be           PCM unsigned 24-bit big-endian
u24le           PCM unsigned 24-bit little-endian
u32be           PCM unsigned 32-bit big-endian
u32le           PCM unsigned 32-bit little-endian
u8              PCM unsigned 8-bit
v210            Uncompressed 4:2:2 10-bit
v210x           Uncompressed 4:2:2 10-bit
vag             Sony PS2 VAG
vc1             raw VC-1
vc1test         VC-1 test bitstream
vfwcap          VfW video capture
vidc            PCM Archimedes VIDC
vividas         Vividas VIV
vivo            Vivo
vmd             Sierra VMD
vobsub          VobSub subtitle format
voc             Creative Voice
vpk             Sony PS2 VPK
vplayer         VPlayer subtitles
vqf             Nippon Telegraph and Telephone Corporation (NTT) TwinVQ
w64             Sony Wave64
wav             WAV / WAVE (Waveform Audio)
wc3movie        Wing Commander III movie
webm_dash_manif WebM DASH Manifest
webp_pipe       piped webp sequence
webvtt          WebVTT subtitle
wsaud           Westwood Studios audio
wsd             Wideband Single-bit Data (WSD)
wsvqa           Westwood Studios VQA
wtv             Windows Television (WTV)
wv              WavPack
wve             Psion 3 audio
xa              Maxis XA
xbin            eXtended BINary text (XBIN)
xbm_pipe        piped xbm sequence
xmv             Microsoft XMV
xpm_pipe        piped xpm sequence
xvag            Sony PS3 XVAG
xwd_pipe        piped xwd sequence
xwma            Microsoft xWMA
yop             Psygnosis YOP
yuv4mpegpipe    YUV4MPEG pipe
```

## Credits

I (Guilherme) created this Nodejs library as a wrapper for an executable that must be installed before using the library, this code and the external executable provide no warranties.

I am not the creator nor a contributor of FFMPEG, all right belong to the contributors as described in their [website](https://ffmpeg.org).
